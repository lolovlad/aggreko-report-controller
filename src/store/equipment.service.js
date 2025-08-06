import axios from "axios";


class EquipmentService{
    getEquipmentPage(page, perItemPage){
        return axios
            .get(`/equipment/page`, {params: {page: page, per_item_page: perItemPage}})
            .then((response) => {
                if(response.status === 200)
                    return response
            })
            .catch((response) => {
                throw response
            })
    }
    deleteEquipment(uuid){
        return axios
            .delete(`/equipment/${uuid}`, )
            .then((response) => {
                if(response.status === 200){
                    return response
                }
            })
            .catch(function (e){
                throw e
            })
    }
    getEquipmentByUuid(uuid){
        return axios
            .get(`/equipment/get/${uuid}`)
            .then((response) => {
                if(response.status === 200)
                    return response.data
            })
            .catch(function (e){
                throw e
            })
    }
    addEquipment(uuidObject, obj){
        return axios
            .post(`/equipment`, obj)
            .then((response) => {
                if(response.status === 201)
                    return response.data.message
            })
            .catch(function (e){
                throw e.data.message
            })
    }
    updateEquipment(uuidEquipment, equip){
        return axios
            .put(`/equipment/${uuidEquipment}`, equip)
            .then((response) => {
                if(response.status === 200)
                    return response
            })
            .catch(function (e){
                throw e.data.message
            })
    }
    searchEquipment(search){
        return axios
            .get(`/equipment/search`, {params: {search_field: search}})
            .then((response) => {
                if(response.status === 200)
                    return response.data
            })
            .catch(function (e){
                throw e
            })
    }
}

export default new EquipmentService();