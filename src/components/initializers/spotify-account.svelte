<script lang="ts">
import { getClient } from "svelte-apollo";
import {
  SpotifyLoginDocument, SpotifyLogoutDocument
} from "~/graphql/types";
import { accountService } from "~/machines/spotify-account-machine";

const client = getClient();

const login = (code?: string) => {

  client.query({
    query: SpotifyLoginDocument,
    variables: { code }
  });

};

const logout = async () => {

  const result = await client.query({ query: SpotifyLogoutDocument });
  console.log({ result });

};

accountService.send({
  login,
  logout,
  type: "SET_FUNCTION"
});
</script>
