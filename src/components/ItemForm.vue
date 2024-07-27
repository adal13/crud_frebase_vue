<template>
    <div>
        <h2>{{ isEdit ? 'Edit' : 'Add' }} Item</h2>
        <form @submit.prevent="handleSubmit">
            <input type="text" v-model="name" placeholder="Item Name" required />
            <button type="submit">{{ isEdit ? 'Update' : 'Add' }} Item</button>
            <button type="button" @click="resetForm">Cancel</button>
        </form>
    </div>
</template>

<script>
import { ref, watch, computed } from 'vue';
import { useItemStore } from '../stores/itemStore';

export default {
    props: {
        item: Object
    },
    setup(props, { emit }) {
        const itemStore = useItemStore();
        const name = ref('');

        // Declarar resetForm antes de usarlo en el watch
        const resetForm = () => {
            name.value = '';
            emit('reset-form'); // Emitir un evento para notificar el restablecimiento del formulario
        };

        // Watch para detectar cambios en el prop item
        watch(
            () => props.item,
            newVal => {
                if (newVal) {
                    name.value = newVal.name;
                } else {
                    resetForm();
                }
            },
            { immediate: true }
        );

        const isEdit = computed(() => !!props.item);

        const handleSubmit = () => {
            if (isEdit.value) {
                itemStore.updateItem({ id: props.item.id, name: name.value });
            } else {
                itemStore.addItem({ name: name.value });
            }
            resetForm();
        };

        return {
            name,
            isEdit,
            handleSubmit,
            resetForm
        };
    }
};
</script>
