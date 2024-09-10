const updateItem = (items, updatedItem) => items.map((item) => item.id === updatedItem.id ? updatedItem : item);

export { updateItem };
