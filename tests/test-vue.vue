<template>
  <!-- Vue template with directives -->
  <div id="app">
    <h1>{{ title }}</h1>
    <p v-if="showMessage">{{ message }}</p>
    
    <input 
      v-model="userInput" 
      @keyup.enter="addItem"
      placeholder="Type something..."
    />
    
    <button @click="addItem">Add Item</button>
    <button @click="toggleMessage">Toggle Message</button>
    
    <ul>
      <li 
        v-for="(item, index) in items" 
        :key="index"
        @click="removeItem(index)"
        :class="{ completed: item.completed }"
      >
        {{ item.text }}
        <input 
          type="checkbox" 
          v-model="item.completed"
          @change="updateItemStatus(index)"
        />
      </li>
    </ul>
    
    <my-component 
      :items-count="items.length"
      @custom-event="handleCustomEvent"
    />
    
    <component 
      :is="currentComponent"
      v-bind="componentProps"
    />
  </div>
</template>

<script>
// Vue component script
import MyComponent from './MyComponent.vue';

export default {
  name: 'App',
  components: {
    MyComponent
  },
  data() {
    return {
      title: 'Vue.js App',
      message: 'Hello Vue!',
      showMessage: true,
      userInput: '',
      items: [
        { text: 'Learn Vue.js', completed: false },
        { text: 'Build amazing apps', completed: false }
      ],
      currentComponent: 'MyComponent',
      componentProps: {
        count: 0
      }
    };
  },
  computed: {
    completedItemsCount() {
      return this.items.filter(item => item.completed).length;
    },
    // Computed property with dependencies
    status() {
      if (this.items.length === 0) return 'No items';
      if (this.completedItemsCount === this.items.length) return 'All done!';
      return `${this.completedItemsCount} of ${this.items.length} completed`;
    }
  },
  methods: {
    addItem() {
      if (this.userInput.trim()) {
        this.items.push({
          text: this.userInput,
          completed: false
        });
        this.userInput = '';
      }
    },
    removeItem(index) {
      this.items.splice(index, 1);
    },
    toggleMessage() {
      this.showMessage = !this.showMessage;
    },
    updateItemStatus(index) {
      this.items[index].completed = !this.items[index].completed;
    },
    handleCustomEvent(payload) {
      console.log('Custom event received:', payload);
    }
  },
  mounted() {
    console.log('App component mounted!');
  },
  watch: {
    items: {
      handler(newItems) {
        console.log('Items changed:', newItems);
      },
      deep: true
    }
  }
};
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.completed {
  text-decoration: line-through;
  color: #999;
}

button {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 10px 20px;
  margin: 5px;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #359c6d;
}
</style>