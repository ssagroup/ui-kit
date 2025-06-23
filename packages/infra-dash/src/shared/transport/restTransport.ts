import { Dashboard } from '../dashboard';
import { tryCatch } from '../exception';
import { GrafanaDashboard, GrafanaPanel, GrafanaPanelData } from '../grafana';
import {
  CreateDashboardPayload,
  InfraDashTransport,
  UpdateDashboardPayload,
} from './baseTransport';

export type RestInfraDashTransportConfig = {
  baseUrl: string;
  authMiddleware?: (request: Request) => Promise<Request> | Request;
  unwrapResponse?: <T>(response: unknown) => Promise<T> | T;
};

export class RestInfraDashTransport implements InfraDashTransport {
  protected baseUrl: string;
  protected authMiddleware?: (request: Request) => Promise<Request> | Request;
  protected unwrapResponse?: <T>(response: unknown) => Promise<T> | T;

  constructor({
    baseUrl,
    authMiddleware,
    unwrapResponse,
  }: RestInfraDashTransportConfig) {
    if (!baseUrl) {
      throw new Error('Base URL is required for RestInfraDashTransport');
    }
    this.baseUrl = baseUrl;
    this.authMiddleware = authMiddleware;
    this.unwrapResponse = unwrapResponse;
  }

  getUrl(path: string): string {
    return `${this.baseUrl}${path}`;
  }

  async applyMiddlewares(request: Request) {
    if (this.authMiddleware) {
      return await this.authMiddleware(request);
    }
    return request;
  }

  // TODO: add validation schema support
  protected async makeRequest<T = unknown>(
    request: Request,
    parseResponse = true,
  ): Promise<T> {
    const finalizedRequest = await this.applyMiddlewares(request);
    const [error, response] = await tryCatch(fetch(finalizedRequest));
    if (error || !response.ok) {
      throw new Error(
        `Request ${finalizedRequest.url} failed: ${error?.message ?? response?.statusText}`,
      );
    }
    if (!parseResponse) {
      return response as unknown as T;
    }
    const json = await response.json();
    let result = json as T;
    if (this.unwrapResponse) {
      result = await this.unwrapResponse<T>(json);
    }
    return result;
  }

  async getGrafanaDashboards(signal?: AbortSignal) {
    const request = new Request(this.getUrl('/grafana/dashboards'), {
      method: 'GET',
      signal,
    });
    return await this.makeRequest<GrafanaDashboard[]>(request);
  }

  async getGrafanaPanels(grafanaDashboardUid: string, signal?: AbortSignal) {
    const request = new Request(
      this.getUrl(`/grafana/dashboards/${grafanaDashboardUid}`),
      {
        method: 'GET',
        signal,
      },
    );
    return await this.makeRequest<GrafanaPanel[]>(request);
  }

  async getGrafanaPanelData(
    {
      dashboardUid,
      panelId,
    }: {
      dashboardUid: string;
      panelId: number;
    },
    signal?: AbortSignal,
  ) {
    const request = new Request(
      this.getUrl(`/grafana/dashboards/${dashboardUid}/panel/${panelId}`),
      {
        method: 'POST',
        signal,
      },
    );
    return await this.makeRequest<GrafanaPanelData>(request);
  }

  async getDashboards(signal?: AbortSignal) {
    const request = new Request(this.getUrl(`/dashboards`), {
      method: 'GET',
      signal,
    });
    return await this.makeRequest<Pick<Dashboard, 'id' | 'title'>[]>(request);
  }

  async getPublishedDashboards(signal?: AbortSignal) {
    const request = new Request(this.getUrl(`/dashboards/published`), {
      method: 'GET',
      signal,
    });
    return await this.makeRequest<Pick<Dashboard, 'id' | 'title'>[]>(request);
  }

  async getDashboard(dashboardUid: number, signal?: AbortSignal) {
    const request = new Request(this.getUrl(`/dashboards/${dashboardUid}`), {
      method: 'GET',
      signal,
    });
    return await this.makeRequest<Dashboard>(request);
  }

  async createDashboard(payload: CreateDashboardPayload, signal?: AbortSignal) {
    const request = new Request(this.getUrl(`/dashboards`), {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
      signal,
    });
    return await this.makeRequest(request, false);
  }

  async updateDashboard(payload: UpdateDashboardPayload, signal?: AbortSignal) {
    const { dashboardId, ...body } = payload;
    const request = new Request(this.getUrl(`/dashboards/${dashboardId}`), {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
      signal,
    });
    return await this.makeRequest(request, false);
  }

  async deleteDashboard(dashboardId: number, signal?: AbortSignal) {
    const request = new Request(this.getUrl(`/dashboards/${dashboardId}`), {
      method: 'DELETE',
      signal,
    });
    return await this.makeRequest(request, false);
  }
}
