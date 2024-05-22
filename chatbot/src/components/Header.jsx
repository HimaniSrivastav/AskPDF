import LogoImg from '../assets/logo.png';
import FileInputComponent from './Input';

const Header = () => {
  return (
    <header className="w-full h-[4em] px-[2.5em] shadow-lg flex flex-row justify-between items-center">
        <div className=''>
        <img src={LogoImg} alt='logoImg' className='h-full'/>
        </div>
        <FileInputComponent/>
        
    </header>
  )
}

export default Header