import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig.js";
import { getDocs, collection, addDoc } from "firebase/firestore";


export default function Project() {

    const [projects, setProjects] = useState([]);
    const [name, setName] = useState("");
    const [owner, setOwner] = useState("");
    const [delivery, setDelivery] = useState("");
    
    const projectsReference = collection(db, "projects");

    useEffect(() => {
        const getProjects = async () => {
            try {
                const data = await getDocs(projectsReference);
                const filterData = data.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
                }) );
                setProjects(filterData);
            } catch (error) {
                console.error(error)
            }
        } 
        getProjects();
    }, []);

    const onSaveProject = async() => {
        try {
            await addDoc(projectsReference, {
                name : name,
                owner : owner,
                delivery : delivery
            });
        } catch (error) {
            console.error(error);
        }
    };
        
    return(<>
        <div>
            <input placeholder="Project name" onChange={e => setName(e.target.value)}></input>
            <input placeholder="Project owner" onChange={e => setOwner(e.target.value)}></input>
            <input placeholder="Project delivery" onChange={e => setDelivery(e.target.value)}></input>
            <button onClick={onSaveProject}>Guardar</button>
        </div>


        {projects.map( (project, index) => (
            <div key = {index}>

                <h1>Nombre: {project.name}</h1>
                <p>Propietario: {project.owner}</p>
                <p>Fecha: {project.delivery}</p>
            </div>
        ) )}
    </>);
}