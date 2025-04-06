<script lang="ts">
  export let variant: "admin" | "member";
</script>

<span
  class="text-[10px] px-1 py-0.5 rounded font-medium {variant === 'admin' ? 'bg-red-500/10 text-red-500' : 'bg-[hsl(var(--primary)/0.1)] text-[hsl(var(--primary))]'}"
>
  <slot>{variant.toUpperCase()}</slot>
</span>
