export type NotificationType = 'Informational' | 'Warning' | 'Error';

export interface Notification {
  id: number;
  botId: number | string | null;
  creationTime: string;
  readAt?: string | null;
  scenarioId?: number | null;
  text: string;
  title: string;
  type: NotificationType;
  userId: number;
}
