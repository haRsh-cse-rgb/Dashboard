import React from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Checkbox,
  useDisclosure,
  HStack,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Tabs,
  TabIndicator,
  Stack,
  Text,
} from '@chakra-ui/react';
import useStore from './store';

function Drawers({ isOpen, onClose }) {
  const { categories, addWidget, removeWidget } = useStore();
  const [selectedCategory, setSelectedCategory] = React.useState('');
  const [selectedWidgets, setSelectedWidgets] = React.useState({});

  
  const handleCheckboxChange = (widgetId, isChecked) => {
    const widget = categories.flatMap(cat => cat.widgets).find(w => w.id === widgetId);

    if (selectedCategory && widget) {
      if (isChecked) {
        addWidget(selectedCategory, widget);
      } else {
        removeWidget(selectedCategory, widgetId);
      }
    }
  };

  
  React.useEffect(() => {
    const category = categories.find(cat => cat.name === selectedCategory);
    if (category) {
      const initialSelectedWidgets = category.widgets.reduce((acc, widget) => {
        acc[widget.id] = true;
        return acc;
      }, {});
      setSelectedWidgets(initialSelectedWidgets);
    } else {
      setSelectedWidgets({});
    }
  }, [categories, selectedCategory]);

  return (
    <Drawer onClose={onClose} isOpen={isOpen} size='md'>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader borderBottomWidth='1px'>Add Widget</DrawerHeader>
        <DrawerBody>
          <Tabs position='relative' variant='unstyled'>
            <TabList mt={'4'}>
              {categories.map((category) => (
                <Tab
                  key={category.name}
                  onClick={() => setSelectedCategory(category.name)}
                >
                  {category.name}
                </Tab>
              ))}
            </TabList>
            <TabIndicator mt='-1.5px' height='2px' bg='purple.500' borderRadius='1px' />
            <TabPanels>
              {categories.map((category) => (
                <TabPanel key={category.name}>
                  <Text fontWeight='bold' mb='2'>{category.name}</Text>
                  <Stack spacing={2}>
                    {category.widgets.map((widget) => (
                      <HStack key={widget.id} spacing={3}>
                      
                        <Checkbox
                          isChecked={selectedWidgets[widget.id] || false}
                          onChange={(e) => handleCheckboxChange(widget.id, e.target.checked)}
                        >
                          {widget.name} 
                        </Checkbox> 
                      </HStack>
                    ))}
                  </Stack>
                </TabPanel>
              ))}
            </TabPanels>
          </Tabs>
        </DrawerBody>
        <DrawerFooter>
          <Button variant='outline' mr={3} onClick={onClose}>
            Close
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default Drawers;
