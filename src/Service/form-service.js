import axios from "axios";

export default class Form {

    static async submit(formData){
        return (await axios.post('http://localhost:5000/save', formData));
    }

}
