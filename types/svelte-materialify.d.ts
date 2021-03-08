import { SvelteComponent } from 'svelte-materialify/@types/shared';

interface FooterProps {
  class?: string;
  absolute?: boolean;
  fixed?: boolean;
  inset?: boolean;
  padless?: boolean;
  style?: null;
}

declare class Footer extends SvelteComponent<FooterProps> {}

export default Footer;
