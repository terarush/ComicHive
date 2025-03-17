<script lang="ts">
  export let type: string = "text"; 
  export let value: string = "";
  export let placeholder: string = ""; 
  export let classes: string = ""; 
  export let disabled: boolean = false; 
  export let required: boolean = false; 

  function handleInput(event: Event) {
    const target = event.target as HTMLInputElement;
    value = target.value;
    dispatch("input", value); 
  }

  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
</script>

<input
  type={type}
  value={value}
  placeholder={placeholder}
  class={`w-full px-4 py-2 text-base rounded-md border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors duration-300 bg-[hsl(var(--background))] text-[hsl(var(--foreground))] ${classes}`}
  disabled={disabled}
  required={required}
  on:input={handleInput}
/>
