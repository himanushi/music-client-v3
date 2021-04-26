<script lang="ts">
import { getClient } from "svelte-apollo";
import {
  SpotifyLoginDocument, SpotifyLogoutDocument
} from "~/graphql/types";
import { accountService } from "~/machines/spotify-account-machine";

const client = getClient();

const login = async (code?: string) => {

  await client.query({
    query: SpotifyLoginDocument,
    variables: { code }
  });

};

const logout = async () => {

  await client.query({ query: SpotifyLogoutDocument });

};

accountService.send({
  login,
  logout,
  type: "SET_FUNCTION"
});
</script>
