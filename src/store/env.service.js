import axios from "axios";


class EnvService{
    loadTypeUser(){
        return axios
            .get(`/env/type_user`)
            .then((response) => {
                if(response.status === 200)
                    return response.data
            })
            .catch(function (e){
                return e
            })
    }
    getProfUser(){
        return axios
            .get(`/env/profession`)
            .then((response) => {
                if(response.status === 200)
                    return response.data
            })
            .catch(function (e){
                return e
            })
    }
    addProf(prof){
        return axios
            .post("/env/profession", prof)
            .then((response) => {
                if(response.status === 201)
                    return response
            })
            .catch(function (e){
                throw e
            })
    }
    deleteProf(id_prof){
        return axios
            .delete(`/env/profession/${id_prof}`)
            .then(
                (response) => {
                    if(response.status === 200)
                        return response
                }
            )
            .catch(function (e){
                throw e
            })
    }
    getTypeBlueprint(){
        return axios
            .get(`/env/type_blueprint`)
            .then((response) => {
                if(response.status === 200)
                    return response.data
            })
            .catch(function (e){
                return e
            })
    }
    addTypeBlueprint(data){
        return axios
            .post("/env/type_blueprint", data)
            .then((response) => {
                if(response.status === 201)
                    return response
            })
            .catch(function (e){
                throw e
            })
    }
    getTypeEquipmentBlueprint(){
        return axios
            .get(`/env/type_equipment_blueprint`)
            .then((response) => {
                if(response.status === 200)
                    return response.data
            })
            .catch(function (e){
                return e
            })
    }
    addTypeEquipmentBlueprint(data){
        return axios
            .post("/env/type_equipment_blueprint", data)
            .then((response) => {
                if(response.status === 201)
                    return response
            })
            .catch(function (e){
                throw e
            })
    }
    getTypeDevice(){
        return axios
            .get(`/env/type_device`)
            .then((response) => {
                if(response.status === 200)
                    return response.data
            })
            .catch(function (e){
                return e
            })
    }
    getTypeEquipment(){
        return axios
            .get(`/env/type_equip`)
            .then((response) => {
                if(response.status === 200)
                    return response.data
            })
    }
    addTypeDevice(data){
        return axios
            .post("/env/type_device", data)
            .then((response) => {
                if(response.status === 201)
                    return response
            })
            .catch(function (e){
                throw e
            })
    }
    exportTypeEquipmentFile(file){
        return axios
            .post(`/env/type_equip/import_file`, file)
            .then(response => {
                if(response.status === 200)
                    return response
            })
            .catch(function (e){
                throw e
            })
    }
    addTypeEquipment(typeEquip){
        return axios
            .post("/env/type_equip", typeEquip)
            .then((response) => {
                if(response.status === 201)
                    return response
            })
            .catch(function (e){
                throw e
            })
    }
}

export default new EnvService();