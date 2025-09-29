import axios from "axios";

class BlueprintService {
    getPageBlueprint(page, perItemPage){
        return axios
            .get('/blueprint/page', {params: {page: page, per_item_page: perItemPage}})
            .then(response => {
                if(response.status === 200)
                    return response
            })
            .catch(function (e){
                throw e
            })
    }
    getFileSchemas(uuid){
        return axios
            .get(`/blueprint/get/file_schemas/${uuid}`)
            .then(response => {
                if(response.status === 200)
                    return response.data
            })
            .catch(function (e){
                throw e
            })
    }
    searchBlueprint(search){
        return axios
            .get('/blueprint/search', {
                params: {
                    search_field: search,
                }
            })
            .then(response => {
                if(response.status === 200)
                    return response
            })
            .catch(function (e){
                throw e
            })
    }
    add(file){
        return axios
            .post(`/blueprint`, file)
            .then(response => {
                if(response.status === 200)
                    return response
            })
            .catch(function (e){
                throw e
            })
    }
    uploadXlsxFile(uuid, file){
        return axios
            .post(`/blueprint/xlsx_file/${uuid}`, file)
            .then(response => {
                if(response.status === 205)
                    return response
            })
            .catch(function (e){
                throw e
            })
    }
    uploadDocxFile(uuid, file){
        return axios
            .post(`/blueprint/docx_file/${uuid}`, file)
            .then(response => {
                if(response.status === 205)
                    return response
            })
            .catch(function (e){
                throw e
            })
    }
    deleteBlueprint(uuid){
        return axios
            .delete(`/blueprint/${uuid}`, )
            .then((response) => {
                if(response.status === 200){
                    return response
                }
            })
            .catch(function (e){
                throw e
            })
    }
}
export default new BlueprintService();
