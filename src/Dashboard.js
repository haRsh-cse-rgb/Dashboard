import React, { useState } from 'react';
import {
  Box, Button, Input, Grid, Text, CloseButton, Modal, ModalOverlay, ModalContent,
  ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure,
  HStack, IconButton,
  Heading,
  Tooltip
} from '@chakra-ui/react';
import { ArrowDownIcon, AtSignIcon, BellIcon, DragHandleIcon, RepeatIcon, SettingsIcon, TimeIcon } from '@chakra-ui/icons';
import useStore from './store';
import Drawers from './Drawer';


const Dashboard = () => {
  const { categories, addWidget, removeWidget } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose
  } = useDisclosure();  
  const {
    isOpen: isDrawerOpen,
    onOpen: onDrawerOpen,
    onClose: onDrawerClose
  } = useDisclosure();  

  const [newWidget, setNewWidget] = useState({ name: '', text: '' });
  const [selectedCategory, setSelectedCategory] = useState('');
  const [lastUpdated, setLastUpdated] = useState(null);
  
  
  const [refreshKey, setRefreshKey] = useState(0);

  const handleAddWidget = () => {
    if (newWidget.name && selectedCategory) {
      addWidget(selectedCategory, { id: Date.now(), name: newWidget.name, text: newWidget.text });
      setNewWidget({ name: '', text: '' });
      setLastUpdated(new Date().toLocaleString());
      onModalClose();
    }
  };

  const handleRemoveWidget = (categoryName, widgetId) => {
    removeWidget(categoryName, widgetId);
    setLastUpdated(new Date().toLocaleString());
  };

  const handleRefresh = () => {
    setRefreshKey(prevKey => prevKey + 1);
    setLastUpdated(new Date().toLocaleString());
  };

  const filteredCategories = searchQuery
    ? categories.filter(category =>
        category.widgets.some(widget =>
          widget.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    : categories;

  return (
    <>

    <HStack
      justifyContent="space-between"
      alignItems="center" 
      width="100%" 
      spacing={4} 
      padding={2} 
    >
      
      <Heading size="xs" fontSize="10px">
        {`Home > Dashboard v2`}
      </Heading>

      
      <Input
        size="xs"
        placeholder="Search widgets..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        outline="1px solid purple"
        variant="outline"
        width="150px" 
        flex="1" 
        marginX="auto" 
      />

      
      <HStack spacing={3}>
        <IconButton icon={<BellIcon />} aria-label="Notifications" size="xs" />
        <IconButton icon={<ArrowDownIcon />} aria-label="Account" size="xs" />
        <IconButton icon={<SettingsIcon />} aria-label="Account" size="xs" />
      </HStack>
    </HStack>

     
     
    



   
    <Box p={5} key={refreshKey} bgColor={'gray.100'} height={'100vh'}>

    
      
        
        <HStack mt={'10'} justifyContent={'space-between'}>
        <Heading size={'md'}>Cnapp Dashboard</Heading>
        <HStack spacing={3}>
        <Button onClick={onDrawerOpen}  colorScheme='gray' border={'1px solid black'} backgroundColor="white" size={'sm'}>
          Add Widgets +
        </Button>
        <Drawers isOpen={isDrawerOpen} onClose={onDrawerClose} />
        <IconButton
          icon={<RepeatIcon />}
          onClick={handleRefresh}
          aria-label="Refresh"
          backgroundColor="white"
          border={'1px solid black'}
          size={'sm'}


  
          
        />
        <IconButton
          icon={<DragHandleIcon />}
          aria-label="DragHandle"
          backgroundColor="white"
          border={'1px solid black'}
          size={'sm'}


  
          
        />

       
       <Box
        size="sm"
        borderRadius="md"
        width="250px"
        backgroundColor="purple.500"
        color="white"
        display={['none', 'none', 'block']}
        padding="2" 
      >
        <HStack spacing="1" align="center"> 
          <TimeIcon boxSize="3" /> 
          <Text fontSize="xs">Last Updated: {lastUpdated || "N/A"}</Text>
        </HStack>
      </Box>

      
      <Box display={['block', 'block', 'none']} size="sm">
        <Tooltip label={`Last Updated: ${lastUpdated || "N/A"}`}>
          <IconButton
            icon={<TimeIcon />}
            aria-label="Last Updated"
            size="xs" 
          />
        </Tooltip>
      </Box>
        </HStack>

        </HStack>
      
      
      {filteredCategories.map(category => (
        <Box key={category.name} mt={5}>
          <Text fontSize="md" fontWeight={'bold'}>{category.name} </Text>
          <Grid templateColumns="repeat(3, 1fr)" gap={6} mt={'1'}>
            {category.widgets.map(widget => (
              <Box key={widget.id} p={3} shadow="md" backgroundColor={'white'} borderRadius="lg">
                <Text fontSize={'20px'} fontWeight={'bold'}>{widget.name}</Text>
                <hr />
                <Text fontSize={'15px'}>{widget.text}</Text>
                <CloseButton backgroundColor="red.500" color="white" size='sm' onClick={() => handleRemoveWidget(category.name, widget.id)}
                    mt={'3'}
                />
              </Box>
            ))}
          </Grid>
          <Button mt={4} onClick={() => { setSelectedCategory(category.name); onModalOpen(); }} variant={'outline'} colorScheme='purple'
          
          >
            + Add Widget
          </Button>
        </Box>
      ))}

      <Modal isOpen={isModalOpen} onClose={onModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Widget</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Widget Name"
              value={newWidget.name}
              onChange={(e) => setNewWidget({ ...newWidget, name: e.target.value })}
              mb={3}
            />
            <Input
              placeholder="Widget Text"
              value={newWidget.text}
              onChange={(e) => setNewWidget({ ...newWidget, text: e.target.value })}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="purple" mr={3} onClick={handleAddWidget}>
              Add Widget
            </Button>
            <Button variant="outline" onClick={onModalClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
    </>
  );
};

export default Dashboard;

