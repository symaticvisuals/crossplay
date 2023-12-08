

// Beacon Wallet instance
export const wallet = null;
  // Tezos instance
export const tezos = null;
  

export const ConnectWalletAPI = async () => {
  try {
   
  } catch (error) {
    return {
      success: false,
      wallet: null,
      error,
    };
  }
};

export const DisconnectWalletAPI = async () => {
  try {
  
  } catch (error) {
    return {
      success: false,
      wallet: null,
      error,
    };
  }
};

export const FetchWalletAPI = async () => {
  try {
   
  } catch (error) {
    return {
      success: false,
      wallet: null,
    };
  }
};

export const CheckIfWalletConnected = async (wallet) => {
    try {
      
    } catch (error) {
      return {
        success: false,
        error,
      };
    }
  };