<script lang="ts">
  import { AppBar, Button, Icon, Menu, ListItem } from 'svelte-materialify';
  import { mdiMenu, mdiDotsVertical } from '@mdi/js';
</script>

<AppBar>
  <div slot="icon">
    <Button fab depressed>
      <Icon path={mdiMenu} />
    </Button>
  </div>
  <span slot="title">ゲーム音楽</span>
  <div style="flex-grow:1" />
  <Menu right>
    <div slot="activator">
      <Button fab depressed>
        <Icon path={mdiDotsVertical} />
      </Button>
    </div>
    <ListItem>Item 1</ListItem>
    <ListItem>Item 2</ListItem>
    <ListItem>Item 3</ListItem>
  </Menu>
</AppBar>
