import { useAccount } from "@starknet-react/core";
import { blo } from 'blo';

const AddressBar = () => {
  const { address } = useAccount();
  
  if (!address) {
    return null;
  }

  return (
    <span className="flex items-center">
      <img 
        src={blo(address as `0x${string}`)} 
        className="mr-2 h-6 w-6 rounded-full" 
        alt="address avatar" 
      />
      {address?.slice(0, 6).concat("...").concat(address?.slice(-4))}
    </span>
  );
};

export default AddressBar;
