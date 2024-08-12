import create from 'zustand';

const useStore = create((set) => ({
  categories: [
    {
      name: 'CSPM Executive Dashboard',
      widgets: []
    },
    {
      name: 'CWPP',
      widgets: []
    },
    {
      name: 'Image',
      widgets: []
    },
    {
      name: 'Tickets',
      widgets: []
    }
  ],
  addWidget: (categoryName, widget) =>
    set((state) => ({
      categories: state.categories.map((category) =>
        category.name === categoryName
          ? { ...category, widgets: [...category.widgets, widget] }
          : category
      ),
    })),
  removeWidget: (categoryName, widgetId) =>
    set((state) => ({
      categories: state.categories.map((category) =>
        category.name === categoryName
          ? {
              ...category,
              widgets: category.widgets.filter((w) => w.id !== widgetId),
            }
          : category
      ),
    })),
}));

export default useStore;
