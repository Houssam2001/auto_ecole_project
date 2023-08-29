import { supabase } from "./client";

export async function fetchAuto (){
    const [formData, setFormData] = useState({
        id: '',
        created_at: '',
        nom: '',
        gerant: '',
        user_id: '',
        telephone: '',
        fax: '',
        adresse: '',
        patente: '',
        date_rc: '',
        ville: '',
        rc: '',
        email: '',
        المدير: '',
        arabic_ecole: '',
        arabic_ville: ''

    });
        try {
            const { data: users, error } = await supabase.from('users').select('*');
            if (error) {
                console.log(error)
                throw new Error("Error fetching users.");
            }
            if (users && users.length > 0) {
                console.log(users)
                 setFormData(users[0]);
            }
        } catch (error) {
            
            // fetchAuto();
            console.error(error);
        }
        return formData;
}