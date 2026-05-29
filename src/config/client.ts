// /src/config/client.ts

// External libraries
import { createThirdwebClient } from "thirdweb";

// Replace this with your client ID string
// refer to https://portal.thirdweb.com/typescript/v5/client on how to get a client ID
const clientId =
  process.env.NEXT_PUBLIC_TW_CLIENT_ID ?? "evergreen-placeholder-client-id";

export const client = createThirdwebClient({
  clientId: clientId,
});
