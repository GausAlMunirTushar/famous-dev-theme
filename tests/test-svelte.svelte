<script>
  // Svelte component script
  import { onMount, onDestroy } from 'svelte';
  import ChildComponent from './ChildComponent.svelte';

  // Reactive declarations
  let count = $state(0);
  let name = $state('');
  let items = $state([]);
  let showItems = $state(true);
  
  // Derived state
  $: doubled = count * 2;
  $: greeting = name ? `Hello ${name}!` : 'Hello stranger!';
  
  // Lifecycle
  let timer;
  
  onMount(() => {
    console.log('Component mounted');
    timer = setInterval(() => {
      // Reactive updates
    }, 1000);
  });
  
  onDestroy(() => {
    if (timer) clearInterval(timer);
  });
  
  // Functions
  function increment() {
    count += 1;
  }
  
  function decrement() {
    count -= 1;
  }
  
  function addItem() {
    if (name.trim()) {
      items = [...items, { id: Date.now(), text: name, completed: false }];
      name = '';
    }
  }
  
  function toggleItem(index) {
    const newItems = [...items];
    newItems[index].completed = !newItems[index].completed;
    items = newItems;
  }
  
  function removeItem(index) {
    items = items.filter((_, i) => i !== index);
  }
</script>

<svelte:head>
  <title>Svelte App</title>
</svelte:head>

<div class="container">
  <h1>{@html greeting}</h1>
  
  <p>Count: {count}</p>
  <p>Doubled: {doubled}</p>
  
  <!-- Event handlers -->
  <button on:click={increment}>+</button>
  <button on:click={decrement}>-</button>
  <button on:click={() => count = 0}>Reset</button>
  
  <!-- Bindings -->
  <input 
    bind:value={name}
    placeholder="Enter your name"
    on:keydown={(e) => e.key === 'Enter' && addItem()}
  />
  
  <button on:click={addItem} disabled={!name.trim()}>
    Add Item
  </button>
  
  <!-- Conditional rendering -->
  {#if showItems}
    <!-- List rendering -->
    <ul>
      {#each items as item, index (item.id)}
        <li 
          class:completed={item.completed}
          on:click={() => toggleItem(index)}
        >
          {item.text}
          
          <!-- Inline event handler -->
          <button 
            on:click={(e) => {
              e.stopPropagation();
              removeItem(index);
            }}
            class="remove-btn"
          >
            ×
          </button>
        </li>
      {:else}
        <li class="empty-state">No items yet</li>
      {/each}
    </ul>
  {/if}
  
  <!-- Using another component -->
  <ChildComponent 
    {items}
    on:itemClicked={(e) => console.log('Item clicked:', e.detail)}
  />
  
  <!-- Slot usage -->
  <ChildComponent>
    <p slot="content">This is content in a slot</p>
  </ChildComponent>
  
  <!-- Attribute bindings -->
  <div 
    class:active={count > 0}
    class:positive={count > 0}
    class:negative={count < 0}
    title="Current count: {count}"
  >
    Status: {count > 0 ? 'positive' : count < 0 ? 'negative' : 'zero'}
  </div>
  
  <!-- Spread props -->
  {#if items.length > 0}
    {@const firstItem = items[0]}
    <div {...firstItem}>
      First item: {firstItem.text}
    </div>
  {/if}
  
  <!-- Await block -->
  {#await fetch('/api/data').then(r => r.json())}
    <p>Loading...</p>
  {:then result}
    <p>Result: {JSON.stringify(result)}</p>
  {:catch error}
    <p>Error: {error.message}</p>
  {/await}
</div>

<style>
  .container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }

  h1 {
    color: #333;
    text-align: center;
  }

  input, button {
    padding: 10px;
    margin: 5px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }

  button {
    background-color: #4CAF50;
    color: white;
    cursor: pointer;
  }

  button:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    padding: 10px;
    margin: 5px 0;
    background-color: #f9f9f9;
    border: 1px solid #eee;
    border-radius: 4px;
    cursor: pointer;
  }

  li.completed {
    text-decoration: line-through;
    color: #888;
    background-color: #f0f0f0;
  }

  .remove-btn {
    float: right;
    background-color: #f44336;
    padding: 2px 8px;
    font-size: 16px;
  }

  .active {
    background-color: #f0f8ff;
  }

  .positive {
    color: green;
  }

  .negative {
    color: red;
  }
</style>