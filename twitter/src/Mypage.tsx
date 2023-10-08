import {Link, Button} from "@chakra-ui/react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function Mypage () {
    const navigate = useNavigate(); 
    const handleLogout = async () => {
     
        try {
          const response = await axios.post('http://localhost:8080/logouts');
          if (response.status === 200) {
            navigate('/');
          }
        } catch (error) {
         console.log(error);
        }
    
    }   
return (
<>
<Link href = "/home">やったね！でも君にはまだまだやる事が残っているはずさ</Link>

<Button bg={"blue.400"} color={"white"}  _hover={{bg: "blue.500",}} type="submit" onClick={handleLogout} mt="30" >
              ログアウト
 </Button>
</>


)
}

export default Mypage;