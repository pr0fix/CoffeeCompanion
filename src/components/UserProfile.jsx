import { Button, Text } from "react-native";
import useLogOut from "../hooks/useLogOut";
const UserProfile = () => {
  const { handleLogOut, error } = useLogOut();

  return (
    <>
      <Text>hello world</Text>
      <Button title="log out" onPress={handleLogOut} />
      {error && <Text style={{ color: "red" }}>{error}</Text>}
    </>
  );
};

export default UserProfile;
