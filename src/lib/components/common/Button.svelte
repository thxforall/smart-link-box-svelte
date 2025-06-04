<script lang="ts">
  export let variant: 'primary' | 'secondary' = 'primary';
  export let type: 'button' | 'submit' | 'reset' = 'button';
  export let disabled = false;
  export let class_name = '';

  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300'
  };
</script>

<button
  {type}
  {disabled}
  class="px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 {variants[variant]} {class_name}"
  on:click
>
  <slot />
</button> 