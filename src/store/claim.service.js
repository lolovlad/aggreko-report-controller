import axios from "axios";

class ClaimService {
    getPage(page, perItemPage){
        return axios
            .get('/claim/page', {params: {page: page, per_item_page: perItemPage}})
            .then(response => {
                if(response.status === 200)
                    return response
            })
            .catch(function (e){
                throw e
            })
    }
    add(data){
        return axios
            .post(`/claim/`, data)
            .then(response => {
                if(response.status === 201)
                    return response
            })
            .catch(function (e){
                throw e
            })
    }
    get(uuid){
        return axios
            .get(`/claim/get/${uuid}`)
            .then(response => {
                if(response.status === 200)
                    return response.data
            })
            .catch(function (e){
                throw e
            })
    }
    updateStateClaim(uuid, stateClaim){
        return axios
            .put(`/claim/update/state/${uuid}/${stateClaim}`)
            .then(response => {
                if(response.status === 200)
                    return response
            })
            .catch(function (e){
                throw e
            })
    }
    updateClaim(uuid, form){
        return  axios
            .post(`/claim/update/${uuid}`, form)
            .then(response => {
                if(response.status === 200)
                    return response
            })
            .catch(function (e){
                throw e
            })
    }
    updateClaimData(uuid, form){
        return  axios
            .post(`/claim/update/data/${uuid}`, form)
            .then(response => {
                if(response.status === 200)
                    return response
            })
            .catch(function (e){
                throw e
            })
    }
    updateFileClaim(uuid){
        return  axios
            .post(`/claim/update/main_file/${uuid}`)
            .then(response => {
                if(response.status === 200)
                    return response
            })
            .catch(function (e){
                throw e
            })
    }
}
export default new ClaimService();
