// SignUp.jsx
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
//import toast from 'react-hot-toast' ;
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  FormControl,
  Input,
  Button,
  Text,
  Box,
  Flex,
  Heading,
  Stack,
  FormErrorMessage
} from '@chakra-ui/react';
export default function SignUp() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();
  const doSubmit = async values => {
    //alert('Sign Up Successful . You are now logged in');
    toast.success('Sign Up Successful. You are now logged in');
  };
  return (
    <Box p="3" maxW="lg" mx="auto">
      <Heading as="h1" textAlign="center" fontSize="3xl" fontWeight="semibold" my="7">
        Create an Account
      </Heading>
      <form onSubmit={handleSubmit(doSubmit)}>
        <Stack gap="4">
          <FormControl isInvalid={errors.username}>
            <Input
              id="username"
              type="text"
              placeholder="Username"
              {...register("username", { required: "Username is required" })}
            />
            <FormErrorMessage>
              {errors.username && errors.username.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.email}>
            <Input
              id="email"
              type="email"
              placeholder="Email"
              {...register('email', { required: 'Email is required' })}
            />
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.password}>
            <Input
              id="password"
              type="password"
              placeholder="Password"
              {...register('password', { required: 'Password is required' })}
            />
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>


          <Button
            mt={4} // Aggiunge margin-top per distanziare il pulsante dal campo di input, se necessario
            type="submit"
            isLoading={isSubmitting}
            colorScheme="teal"
            textTransform="uppercase"
          >
            Sign Up
          </Button><ToastContainer />
        </Stack>
      </form>
      <Flex gap="2" mt="5">
        <Text>Have an account?</Text>
        <Link to="/signin">
          <Text as="span" color="blue.400">
            Sign in
          </Text>
        </Link>
      </Flex>
    </Box>
  );
}