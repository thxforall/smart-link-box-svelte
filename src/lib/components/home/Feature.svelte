<script lang="ts">
  export let icon: string;
  export let title: string;
  export let description: string;
</script>

<div class="bg-white p-6 rounded-lg shadow-md">
  <div class="text-2xl mb-4">{icon}</div>
  <h3 class="text-xl font-semibold mb-2">{title}</h3>
  <p class="text-gray-600">{description}</p>
</div> 