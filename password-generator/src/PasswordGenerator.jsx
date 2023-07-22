import { useState } from 'react';
import { Checkbox, Button, Slider, Input } from 'antd';
// import './index.css';

const PasswordGenerator = () => {
  const [smallChar, setSmallChar] = useState(false);
  const [capsChar, setCapsChar] = useState(false);
  const [numberVal, setNumberVal] = useState(false);
  const [specialChar, setSpecialChar] = useState(false);
  const [passwordRange, setPasswordRange] = useState(12);
  const [generatedPassword, setGeneratedPassword] = useState('');
  // const specialCharacters = '[ !@#$%^&*()_+~`|}{[]:;?><,./-= ]';

  const generateRandomPassword = () => {
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const specialChars = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    let includeChar = '';
    let password = '';
    if (capsChar) includeChar += uppercaseChars;
    if (smallChar) includeChar += lowercaseChars;
    if (specialChar) includeChar += specialChars;
    if (numberVal) includeChar += numberChars;
    console.log(includeChar);
    for (let i = 0; i < passwordRange; i++) {
      let randomIndex = Math.floor(Math.random() * includeChar.length); //Math.floor()
      console.log(randomIndex);
      password += includeChar[randomIndex];
    }
    setGeneratedPassword(password);
  };

  const sliderTrackerStyle = {
    backgroundColor: 'red',
  };
  const sliderHandleStyle = {
    borderColor: 'red', // Replace with your desired color
  };

  let strengthIndicator = null;

  if (passwordRange < 8 && (specialChar || smallChar || capsChar || numberVal)) {
    strengthIndicator = <p className='bg-red-500 text-black rounded-md p-1'>Weak</p>; //Weak
  } else if (passwordRange >= 8 && passwordRange <= 12 && (!specialChar || smallChar || capsChar || numberVal)) {
    strengthIndicator = <p className='bg-amber-300 text-black rounded-md p-1'>Medium</p>;
  } else if (
    passwordRange >= 8 &&
    passwordRange <= 10 &&
    specialChar &&
    (smallChar || capsChar || numberVal || !smallChar || !capsChar || !numberVal)
  ) {
    strengthIndicator = <p className='bg-amber-300 text-black rounded-md p-1'>Medium</p>; //Medium
  } else if (passwordRange >= 12 && !specialChar && (smallChar || capsChar || numberVal)) {
    strengthIndicator = <p className='bg-amber-300 text-black rounded-md p-1'>Medium</p>; //Medium
  } else if (passwordRange >= 11 && specialChar && !smallChar && !capsChar && !numberVal) {
    strengthIndicator = <p className='bg-green-400 text-black rounded-md p-1'>Strong</p>; //Strong
  } else if (
    (passwordRange >= 12 && specialChar && smallChar && capsChar && numberVal) ||
    smallChar ||
    (capsChar && numberVal) ||
    (smallChar && capsChar) ||
    numberVal
  ) {
    strengthIndicator = <p className='bg-green-400 text-black rounded-md p-1'>Strong</p>; //Strong
  }

  return (
    <div className='border border-red-700 flex items-center justify-center h-screen'>
      <div className='bg-purple-800 max-lg:w-1/3 rounded-xl p-5 md:w-6/12 max-md:w-10/12 max-sm:w-10/12 sm:w-10/12 shadow-xl shadow-white'>
        <p className='flex justify-center font-bold text-2xl text-[#E8FFCE] p-4'>🚀Password Generator 🔐</p>
        <div className='p-1 m-4'>
          <div className='flex justify-between'>
            <p className='text-white text-xl'>Select Range of Password</p>
            {/* {passwordRange < 8 && (specialChar || smallChar || capsChar || numberVal) && (
              <p className='bg-red-500 text-black rounded-md p-1'>Weak</p>
            )}
            {passwordRange >= 8 && passwordRange <= 12 && (!specialChar || smallChar || capsChar || numberVal) && (
              <p className='bg-amber-300 text-black rounded-md p-1'>Medium</p>
            )}
            {passwordRange >= 10 && specialChar && (smallChar || capsChar || numberVal) && (
              <p className='bg-green-400 text-black rounded-md p-1'>Strong</p>
            )} */}
            {strengthIndicator}
          </div>
          <Slider
            min={6}
            max={30}
            trackStyle={sliderTrackerStyle}
            railStyle={sliderHandleStyle}
            handleStyle={sliderHandleStyle}
            defaultValue={passwordRange}
            onChange={(e) => setPasswordRange(e)}
          />
        </div>
        <div className='flex flex-col p-1 m-4'>
          <Checkbox onChange={() => setCapsChar(!capsChar)} className='text-white text-xl max-sm:text-lg max-md:text-lg'>
            {' '}
            Uppercase [A-Z]{' '}
          </Checkbox>
          <Checkbox onChange={() => setSmallChar(!smallChar)} className='text-white text-xl max-sm:text-lg max-md:text-lg'>
            {' '}
            Lowercase [a-z]{' '}
          </Checkbox>
          <Checkbox onChange={() => setNumberVal(!numberVal)} className='text-white text-xl max-sm:text-lg max-md:text-lg'>
            {' '}
            Numbers [0-9]{' '}
          </Checkbox>
          <Checkbox onChange={() => setSpecialChar(!specialChar)} className='text-white text-xl max-sm:text-lg max-md:text-lg'>
            {' '}
            Special Characters{' '}
          </Checkbox>
        </div>
        <div>
          <p className='text-3xl text-lime-400 text-center p-5'>{generatedPassword}</p>
          <Input size="large" placeholder="Password" value={generatedPassword}/>
        </div>

        <div className='flex justify-center '>
          <Button
            className='m-1 bg-sky-700 text-white border-none'
            onClick={generateRandomPassword}
            disabled={!smallChar && !capsChar && !specialChar && !numberVal}
          >
            Generate
          </Button>
        </div>
        <p className='text-center text-xs italic text-white'>(Note:* To genrate password, please select atleast one condtion)</p>
      </div>
    </div>
  );
};

export default PasswordGenerator;
