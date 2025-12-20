const BASE_URL =
  import.meta.env.VITE_API_BASE_URL ??
  'https://helloworld-world-enterprise-rails-1.onrender.com';

const isDevelopment = import.meta.env.MODE === 'development';

function logDev(...args: unknown[]) {
  if (isDevelopment) {
    console.log('[API Client]', ...args);
  }
}

function logErrorDev(...args: unknown[]) {
  if (isDevelopment) {
    console.error('[API Client]', ...args);
  }
}

function getToken(): string | null {
  return localStorage.getItem('token');
}

function getHeaders(includeAuth: boolean = true): HeadersInit {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };
  if (includeAuth) {
    const token = getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }
  return headers;
}

async function handleResponse<T>(response: Response): Promise<T> {
  logDev('Response received:', {
    url: response.url,
    status: response.status,
    statusText: response.statusText,
    ok: response.ok
  });

  if (!response.ok) {
    let errorBody = '';
    try {
      errorBody = await response.text();
    } catch (e) {
      logErrorDev('Failed to read error response:', e);
    }
    
    const errorMessage = `HTTP ${response.status}: ${errorBody || response.statusText}`;
    logErrorDev('API Error:', {
      status: response.status,
      statusText: response.statusText,
      url: response.url,
      body: errorBody,
      headers: Object.fromEntries(response.headers.entries())
    });
    
    throw new Error(errorMessage);
  }
  return response.json() as Promise<T>;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
  name?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  roles: string[];
}

export interface LoginResponse {
  user: User;
  token: string;
}

export interface RegisterResponse {
  user: User;
  token: string;
}

export interface Organization {
  id: string;
  name: string;
  organization_type: string;
  description: string;
  website: string;
  email: string;
  phone: string;
  logo_url: string;
  region_key: string;
  active: boolean;
  residency: string;
  plan: string;
  memberCount: number;
}

export interface OrganizationsResponse {
  organizations: Organization[];
}

export interface Task {
  id: number;
  organization_id: number;
  user_id: number;
  created_by_id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  due_date: string;
  completed_at: string;
}

export interface Event {
  id: number;
  organization_id: number;
  user_id: number;
  title: string;
  description: string;
  start_time: string;
  end_time: string;
  timezone: string;
  location_name: string;
  location_address: string;
  event_type: string;
  capacity: number;
  attendees_count: number;
  public: boolean;
  registration_required: boolean;
}

export interface Post {
  id: number;
  organization_id: number;
  user_id: number;
  title: string;
  content: string;
  post_type: string;
  published: boolean;
  published_at: string;
  views_count: number;
  likes_count: number;
  comments_count: number;
}

export interface DashboardSnapshot {
  organization: Organization;
  posts: Post[];
  events: Event[];
  tasks: Task[];
}

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  logDev('POST /api/v1/auth/login', { email: payload.email });

  const response = await fetch(`${BASE_URL}/api/v1/auth/login`, {
    method: 'POST',
    headers: getHeaders(false),
    body: JSON.stringify({
      email: payload.email,
      password: payload.password,
      user: {
        email: payload.email,
        password: payload.password,
      },
    }),
  });

  return handleResponse<LoginResponse>(response);
}


export async function register(
  payload: RegisterPayload
): Promise<RegisterResponse> {
  logDev('POST /api/v1/auth/register', { email: payload.email });
  const response = await fetch(`${BASE_URL}/api/v1/auth/register`, {
    method: 'POST',
    headers: getHeaders(false),
    body: JSON.stringify(payload),
  });
  return handleResponse<RegisterResponse>(response);
}

export async function getOrganizations(): Promise<OrganizationsResponse> {
  logDev('GET /api/v1/organizations');
  const response = await fetch(`${BASE_URL}/api/v1/organizations`, {
    method: 'GET',
    headers: getHeaders(),
  });
  return handleResponse<OrganizationsResponse>(response);
}

export async function getOrganization(id: number): Promise<Organization> {
  logDev(`GET /api/v1/organizations/${id}`);
  const response = await fetch(`${BASE_URL}/api/v1/organizations/${id}`, {
    method: 'GET',
    headers: getHeaders(),
  });
  return handleResponse<Organization>(response);
}

export async function getDashboardSnapshot(): Promise<DashboardSnapshot> {
  const url = `${BASE_URL}/api/v1/dashboard/snapshot`;
  logDev('GET /api/v1/dashboard/snapshot', {
    url,
    baseUrl: BASE_URL,
    hasToken: !!getToken()
  });
  
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: getHeaders(),
    });
    return handleResponse<DashboardSnapshot>(response);
  } catch (error) {
    logErrorDev('Failed to fetch dashboard snapshot:', error);
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Network error: Unable to connect to API server. Please check if the server is running.');
    }
    throw error;
  }
}
