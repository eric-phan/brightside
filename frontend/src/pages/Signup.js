import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import { TextInput, Button, Card, Paper } from "@mantine/core";

const Signup = () => {
  // keep track of what people wype into the unput fields
  const [email, setEmail] = useState("");
  // setEmail updates the value, the initial state is an empty string
  const [password, setPassword] = useState("");
  const { signup, error, isLoading } = useSignup();
  // grab the three parameters from useSingup hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    // prevent a default refresh of the page

    await signup(email, password);
    // send post request to the server with these parameters, the signup hook has this logic
  };

  return (
    <Card className="signupCard">
      <Paper shadow="xl" className="signupContainer">
        <form className="signup" onSubmit={handleSubmit}>
          <h3>Sign Up</h3>

          <label>Email address:</label>
          <TextInput
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />

          <label>Password:</label>
          <TextInput
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />

          <Button disabled={isLoading} type="submit">
            Sign up
          </Button>
          {error && <div className="error">{error}</div>}
        </form>
      </Paper>
    </Card>
  );
};

export default Signup;
