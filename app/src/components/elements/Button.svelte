<script lang="ts">
  export let type: "button" | "submit" | "reset" = "button";
  export let variant: "primary" | "secondary" | "outline" = "primary";
  export let disabled: boolean = false;
  export let classes: string = "";

  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  function handleClick() {
    if (!disabled) {
      dispatch("click");
    }
  }
</script>

<button
  {type}
  class={`
  hover:cursor-pointer
  flex gap-2
  items-center
    ${
      variant === "primary"
        ? "bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]"
        : ""
    }
    ${
      variant === "secondary"
        ? "bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))]"
        : ""
    }
    ${
      variant === "outline"
        ? "border border-[hsl(var(--primary))] text-[hsl(var(--primary))] bg-transparent"
        : ""
    }
    px-4 py-2 rounded-sm transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[hsl(var(--ring))]
    ${disabled ? "opacity-50 cursor-not-allowed" : ""}
    ${classes}
  `}
  {disabled}
  on:click={handleClick}
>
  <slot />
</button>
