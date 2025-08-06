import axios from "axios";

class DeviceService {
    getPage(page, perItemPage){
        return axios
            .get('/device/page', {params: {page: page, per_item_page: perItemPage}})
            .then(response => {
                if(response.status === 200)
                    return response
            })
            .catch(function (e){
                throw e
            })
    }
    search(search){
        return axios
            .get('/device/search', {
                params: {
                    search_field: search,
                }
            })
            .then(response => {
                if(response.status === 200)
                    return response.data
            })
            .catch(function (e){
                throw e
            })
    }
    add(file){
        return axios
            .post(`/device`, file)
            .then(response => {
                if(response.status === 200)
                    return response
            })
            .catch(function (e){
                throw e
            })
    }
    exportFile(file){
        return axios
            .post(`/device/update_file`, file)
            .then(response => {
                if(response.status === 200)
                    return response
            })
            .catch(function (e){
                throw e
            })
    }
}
export default new DeviceService();