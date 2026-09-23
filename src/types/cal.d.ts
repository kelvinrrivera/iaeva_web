declare module "@calcom/embed-react" {
  import type { ComponentProps, FC } from "react";
  
  type CalComponentProps = {
    calOrigin?: string;
    calLink: string;
    initConfig?: {
      debug?: boolean;
      uiDebug?: boolean;
    };
    namespace?: string;
    config?: any;
    embedJsUrl?: string;
  } & React.HTMLAttributes<HTMLDivElement>;

  export interface CalApiOptions {
    embedJsUrl?: string;
    namespace?: string;
  }

  export type GlobalCal = {
    (action: string, options?: any): void;
    namespace?: (ns: string) => GlobalCal;
  };

  export type GlobalCalWithoutNs = {
    (action: string, options?: any): void;
  };

  const Cal: FC<CalComponentProps>;
  
  export function getCalApi(options?: CalApiOptions): Promise<GlobalCal | GlobalCalWithoutNs>;
  export function getCalApi(embedJsUrl: string): Promise<GlobalCal | GlobalCalWithoutNs>;
  
  export default Cal;
} 