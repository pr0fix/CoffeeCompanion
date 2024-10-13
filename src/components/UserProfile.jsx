import { Button, Text } from "react-native";
import useSignOut from "../hooks/useSignOut";
const UserProfile = () => {
  const { handleSignOut, error } = useSignOut();

  return (
    <>
      <Text>hello world</Text>
      <Button title="sign out" onPress={handleSignOut} />
      {error && <Text style={{ color: "red" }}>{error}</Text>}
    </>
  );
};

export default UserProfile;
