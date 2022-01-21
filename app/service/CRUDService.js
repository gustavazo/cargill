import HTTPService from "./HTTPService";

class CRUDService extends HTTPService {
    resourceName = "";

    constructor(resourceName) {
        super();

        this.resourceName = resourceName;
        this.setDefaultBaseUrl(resourceName);
    }

    async find(filter) {
        return await this.api.get("", {
            params: {
                filter: filter
            }
        });
    }

    async findById(id, filter = {}) {
        return await this.api.get("/" + id, {
            params: {
                filter
            }
        });
    }

    async remove(id) {
        return await this.api.delete(id);
    }

    async create(newModel) {
        return await this.api.post("", newModel);
    }

    async update(id, newModel) {
        return await this.api.put("/" + id, newModel);
    }

    async updateFields(id, newModel) {
        return await this.api.patch("/" + id, newModel);
    }

    async link(id, targetModel, fk) {

        return await this.api.patch(`${id}/${targetModel}/link/${fk}`);
    }

    async unlink(id, targetModel, fk) {
        return await this.api.delete(`${id}/${targetModel}/unlink/${fk}`);
    }

    async findLinked(id, targetModel, filter) {
        return await this.api.get(`${id}/${targetModel}`, {
            params: {
                filter
            }
        });
    }
    
    async count() {
        return await this.api("/count")
    }

    async fetchBetweenDates(start, end) {
        return await this.find({
            include: ['users'],
            where: {
                date: {
                    between: [start.getTime(), end.getTime()]
                }
            }
        });
    }
}
export default CRUDService;