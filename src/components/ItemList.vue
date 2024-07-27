<template>
    <div>
        <h2>Item List</h2>
        <ul>
            <li v-for="item in items" :key="item.id">
                {{ item.name }}
                <button @click="startEdit(item)">Edit</button>
                <button @click="deleteItem(item.id)">Delete</button>
            </li>
        </ul>
        <button @click="fetchItems">Refresh</button>

        <!-- Formulario de edición -->
        <div v-if="editingItem">
            <h3>Edit Item</h3>
            <form @submit.prevent="updateItem">
                <label for="name">Name:</label>
                <input v-model="editingItem.name" id="name" required />
                <button type="submit">Save</button>
                <button type="button" @click="cancelEdit">Cancel</button>
            </form>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useItemStore } from '../stores/itemStore';

export default {
    setup() {
        const itemStore = useItemStore();

        // Referencias reactivas
        const items = ref(itemStore.items);
        const editingItem = ref(null); // Para manejar el item que se está editando

        // Métodos
        const fetchItems = async () => {
            await itemStore.fetchItems();
            items.value = itemStore.items;
        };

        const deleteItem = async (id) => {
            await itemStore.deleteItem(id);
            items.value = itemStore.items;
        };

        const startEdit = (item) => {
            // Clonar el item para edición
            editingItem.value = { ...item };
        };

        const updateItem = async () => {
            if (editingItem.value) {
                await itemStore.updateItem(editingItem.value);
                items.value = itemStore.items; // Actualizar la lista
                cancelEdit(); // Opcional: cancelar la edición después de guardar
            }
        };

        const cancelEdit = () => {
            editingItem.value = null; // Limpiar el item en edición
        };

        onMounted(() => {
            fetchItems();
        });

        return {
            items,
            fetchItems,
            deleteItem,
            startEdit,
            editingItem,
            updateItem,
            cancelEdit
        };
    }
};
</script>
