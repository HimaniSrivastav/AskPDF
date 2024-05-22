import LogoImg from '../assets/logo.png';
import { useContext } from 'react';
import FileInputComponent from './Input';
import { CheckContext } from './store/checkProvider';
const Header = () => {
  const {fileName,uploading}=useContext(CheckContext)
  return (
    <header className="w-full h-[55px] px-[1em] sm:px-[2.5em] shadow-lg flex flex-row justify-between items-center">
        <div className='relative'>
        <img src={LogoImg} alt='logoImg' className='h-full '/>
        </div>
        <div className='flex flex-row gap-2 items-center'>
          {!uploading &&<p className='text-[#25b09d] text-[10px] sm:text-[1em]'>{fileName}</p>}
        <FileInputComponent/>
        </div>
        
    </header>
  )
}

export default Header