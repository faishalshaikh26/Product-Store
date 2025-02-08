import React, { useState } from 'react'
import {Container , VStack ,Heading , Box, useToast, useColorModeValue, Input, Button} from '@chakra-ui/react'
import { useProductStore } from '../../Store/Product'

const CreatePage = () => {
  const [newProduct , setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  })

  const {createProduct}=useProductStore()
  const toast = useToast()

  const handleAddProduct = async () => {
    const {success , message} = await createProduct (newProduct);
    if(!success){
      toast({
          title: 'Error',
          description: message,
          status: 'error',
          duration: 4000,
          isClosable: true,
        })
    }
    else {
      toast({
        title: 'Success',
        description: message,
        status: 'success',
        duration: 4000,
        isClosable: true,
      })
    }
    
  }
  return (
    
    <Container maxW={'container.sm'}>
      <VStack
      spacing={8}>
        <Heading as={'h1'} size={'2xl'} textAlign={'center'} mb={8}>
          Create New Product
        </Heading>

        <Box
        w={'full'} bg={useColorModeValue('white' ,'gray.800')}
        p={6} rounded={'lg'} shadow={'md'}>
          <VStack spacing={4}>

          <Input 
          placeholder ='Product Name'
          name='name'
          value={newProduct.name}
          onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}/>

          <Input 
          placeholder ='Price'
          name='price'
          value={newProduct.price}
          onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}/>
          
          <Input 
          placeholder ='Image URL'
          name='image'
          value={newProduct.image}
          onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}/>

          <Button colorScheme='blue' onClick={handleAddProduct} w='full'>
          Add Product
          </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  )
}

export default CreatePage