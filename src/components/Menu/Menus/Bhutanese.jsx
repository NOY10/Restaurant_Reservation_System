import {useState} from 'react'
import '../Menu.css';
import {useSelector} from 'react-redux';
import {selectUser } from '../../../features/userSlice';
import { setDoc,collection,doc } from 'firebase/firestore';
import { db } from '../../../config/firebase';
import pic1 from './img/ema datshi.jpg';
import pic2 from './img/kewa datshi.jpg';
import pic3 from './img/shakam.jpg';
import pic4 from './img/jashamaru.jpg';
import pic5 from './img/phakshapaa.jpg';


function Bhutanese() {

    const user = useSelector(selectUser);

    const [inputData1, setInputData1] = useState('');
    const [inputData2, setInputData2] = useState('');
    const [inputData3, setInputData3] = useState('');
    const [inputData4, setInputData4] = useState('');
    const [inputData5, setInputData5] = useState('');

    let tolPrice=0
    let flag=true;
    const order = async(Name,price) =>{
        if(inputData1!=="" || inputData2!=="" || inputData3!=="" || inputData4!=="" || inputData5!==""){
            if (Name==='ema datshi' && inputData1 >= 1 && inputData1 <= 10){
                tolPrice=inputData1*price
            }
            else if (Name==='Kewa Datshi' && inputData2 >= 1 && inputData2 <= 10){
                tolPrice=inputData2*price
            }
            else if (Name==='Shakam Paa' && inputData3 >= 1 && inputData3 <= 10){
                tolPrice=inputData3*price
            }
            else if (Name==='Jasha Maru' && inputData4 >= 1 && inputData4 <= 10){
                tolPrice=inputData4*price
            }
            else if (Name==='Phaksha Paa' && inputData5 >= 1 && inputData5 <= 10){
                tolPrice=inputData5*price
            }
            else{
                alert("Please Enter number between 1-10")
                flag=false;
            }
            const entityDocRef = doc(db, 'order', user.email);
            const entityData = {
                name:user.displayName,
                email:user.email,
              };
            await setDoc(entityDocRef, entityData);
            const fieldsCollectionRef = collection(entityDocRef, 'orders');
            
            if(tolPrice!==0){
                const field1Data = {
                    name:user.displayName,
                    email:user.email,
                    dishName:Name,
                    Dprice: price,
                    tolPrice
                };
                const customOrderDocRef = doc(fieldsCollectionRef, Name);
                await setDoc(customOrderDocRef, field1Data);
            }
            flag?alert("Thank You for your order!"):""
            
        } else{
            alert("Empty field")
        }
        setInputData1("");
        setInputData2("");
        setInputData3("");
        setInputData4("");
        setInputData5("");
      };
    
  return (
    <div>
        <div className="menuf"><img src={pic1} className="menuimg"/><h3>Ema Datshi</h3>
                <div className="menutxt">Dish of spicy chili peppers and melted cheese, served with steamed rice and fresh vegetables.<br/>Price: Nu.150</div>
                <div className="orderS">
                    <p className="orderP">Number of orders:</p>
                    <input 
                        type='text' 
                        className="orderI"
                        value={inputData1}
                        onChange={(e) => setInputData1(e.target.value)}
                    />
                    <button className="Menubtn" onClick={() =>order('ema datshi','150')}>Order</button>
                </div>
                
            </div>
            <div className="menuf"><img src={pic2} className="menuimg"/><h3>Kewa Datshii</h3>
                <div className="menutxt">Dish made with potatoes and cheese, served with steamed rice and fresh vegetables.<br/>Price: Nu.130</div>
                <div className="orderS">
                    <p className="orderP">Number of orders:</p>
                    <input 
                        type='text' 
                        className="orderI"
                        value={inputData2}
                        onChange={(e) => setInputData2(e.target.value)}
                    />
                    <button className="Menubtn" onClick={() =>order('Kewa Datshi','130')}>Order</button>
                </div>
            </div>
            <div className="menuf"><img src={pic3} className="menuimg"/><h3>Shakam Paa</h3>
                <div className="menutxt">dish made with dried beef and spicy chili peppers, served with red rice and sautéed vegetables.<br/>Price: Nu.200</div>
                <div className="orderS">
                    <p className="orderP">Number of orders:</p>
                    <input 
                        type='text' 
                        className="orderI"
                        value={inputData3}
                        onChange={(e) => setInputData3(e.target.value)}
                    />
                    <button className="Menubtn" onClick={() =>order('Shakam Paa','200')}>Order</button>
                </div>
            </div>
            
            <div className="menuf"><img src={pic4} className="menuimg"/><h3>Jasha Maru</h3>
                <div className="menutxt">dish made with minced chicken, onions, garlic, and chili peppers, served with red rice and sautéed vegetables.<br/>Price: Nu.200</div>
                <div className="orderS">
                    <p className="orderP">Number of orders:</p>
                    <input 
                        type='text' 
                        className="orderI"
                        value={inputData4}
                        onChange={(e) => setInputData4(e.target.value)}
                    />
                    <button className="Menubtn" onClick={() =>order('Jasha Maru','200')}>Order</button>
                </div>
            </div>
            <div className="menuf"><img src={pic5} className="menuimg"/><h3>Phaksha Paa</h3>
                <div className="menutxt">Slow-cooked cubes of succulent pork belly, infused with aromatic garlic, ginger, onion, and a blend of traditional Bhutanese spices<br/>Price: Nu.210</div>
                <div className="orderS">
                    <p className="orderP">Number of orders:</p>
                    <input 
                        type='text' 
                        className="orderI"
                        value={inputData5}
                        onChange={(e) => setInputData5(e.target.value)}
                    />
                    <button className="Menubtn" onClick={() =>order('Phaksha Paa','210')}>Order</button>
                </div>
            </div>
    </div>
  )
}

export default Bhutanese