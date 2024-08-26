export interface FastLink {
  open: (config: FastLinkConfig & FastLinkOpenInterface, container: string) => void;
  close: () => void;
}

export interface FastLinkConfig {
  fastLinkURL: string;
  accessToken?: string;
  params?: {
    configName?: string;
  };
}

export interface FastLinkOpenInterface {
  onSuccess?: (data: any) => void;
  onError?: (data: any) => void;
  onEvent?: (data: any) => void;
  onClose?: (data: any) => void;
}
