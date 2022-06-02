<template>
        <div>
              <div class="container-fluid px-4">
                <h1 class="mt-4">Class</h1>
                <ol class="breadcrumb mb-4">
                        <li class="breadcrumb-item"><router-link to="/home">Home</router-link></li>
                        <li class="breadcrumb-item active">Class</li>
                </ol>
                
                <div class="card mb-4">
                <div class="card-header">
                        <i class="fas fa-table me-1"></i>
                        List Class

                        <button @click="Add()" data-bs-toggle="modal" data-bs-target="#class_modal" class="btn btn-primary btn-sm float-end"><i class="fas fa-plus fa-fw" data-bs-dismiss="modal"></i>Add Class</button>
                        
                </div>
                <div class="card-body">
                        <table id="class_table" class="table table-responsive table-striped table-hover" cellspacing="0" width="100%">
                            
                        <thead>
                                <tr>
                                <th>NO</th>
                                <th>CLASS</th>
                                <th>GROUP</th>
                                <th>ACTION</th>
                                </tr>
                        </thead>
                        <tbody>
                             <tr v-for="(grade, index) in grades" :key="index">
                                <td>{{ index+1 }}</td>
                                <td><span class="badge bg-dark" >{{ grade.class_name }}</span></td>
                                <td>{{ grade.group }}</td>
                                <td>
                                        <button class="btn btn-success" @click="Edit(grade)" data-bs-toggle="modal" data-bs-target="#class_modal"><i class="fas fa-pencil-alt fa-fw"></i></button>
                                        <button class="btn btn-danger" @click="Delete(grade.class_id)"><i class="fas fa-trash-alt fa-fw"></i></button>
                                </td>  
                             </tr> 
                        </tbody>
                        </table>
                </div>
                </div>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="class_modal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog modal-md bg-priamry">
                        <div class="modal-content">
                        <div class="modal-header">
                                <h5 class="modal-title" id="staticBackdropLabel">Class Data</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                              <div class="mb-3">
                                 <label for="class_name" class="form-label">Class Name</label>
                                 <input type="text" class="form-control" id="class_name" v-model="class_name" placeholder="Class Name">
                              </div> 

                              <div class="mb-3">
                                   <label for="group" class="form-label">Group</label>
                                   <input type="text" class="form-control" id="group" v-model="group" placeholder="Group">
                              </div>
                        </div>
                        <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                <button type="button" class="btn btn-primary" @click="Save()" data-bs-dismiss="modal">Submit</button>
                        </div>
                        </div>
                </div>

        </div>
        </div>
</template>
<script>
module.exports = {
        //state
        data : function(){
                return {
                         class_id: "",
                         class_name: "",
                         group: "",
                         action: "",
                         grades: [],
                              }
        },
        methods: {
                getData: function(){
                        //token
               let config = {
                    headers: { "Authorization": "Bearer " + this.$cookies.get("Authorization")}
                }
                axios.get(api_url + "/Grade", config)
                .then( response => {
                  this.grades = response.data;   
                })

                },
                Add: function(){
                    this.class_id = ""
                    this.class_name = ""
                    this.group = ""
                    this.action = "insert"
                
                },
                Edit: function(grade){
                    this.class_id = grade.class_id
                    this.class_name = grade.class_name
                    this.group = grade.group
                    this.action = "update"

                },
                
                Save: function(){
                //maping token
                let config = {
                    headers: { "Authorization": "Bearer " + this.$cookies.get("Authorization")}
                }

                //maping data 
                let form = {
                        //harus sama dengan backend
                         'class_name': this.class_name,
                         'group': this.group,

                }

                if(this.action === 'insert'){ //POST

                        axios.post(api_url + '/Grade', form, config)
                        .then( response => {
                        Swal.fire({
                        title: 'Success!',
                        text: response.data.message,
                        icon: 'success',
                        confirmButtonText: 'OK'
                    })

                                 this.getData()
                        })

                } else { //PUT

                        axios.put(api_url + '/Grade/' + this.class_id, form, config)
                        .then( response => {
                        Swal.fire({
                        title: 'Success!',
                        text: response.data.message,
                        icon: 'success',
                        confirmButtonText: 'OK'
                    })
                        })

                }
               
               this.getData()
                },
                Delete: function(class_id){
                //maping token 
                    let config = {
                    headers: { "Authorization": "Bearer " + this.$cookies.get("Authorization")}
                }

                        Swal.fire({
                                title: 'Delete Data Class',
                                text: 'Do you want to delete this data?',
                                icon: 'warning',
                                showDenyButton: true,
                                showCancelButton: false,
                                confirmButtonText: 'Yes',
                                denyButtonText: `No`,
                                }).then((result) => {
                        if (result.isConfirmed) {
                                axios.delete(api_url + '/Grade/' + class_id, config)
                        .then( response => {

                                Swal.fire({
                                title: 'Success!',
                                text: response.data.message,
                                icon: 'success',
                                confirmButtonText: 'OK'
                        })

                                this.getData()
                        })
     
                        } else  {
                                Swal.fire({
                                title: 'Cancel !',
                                text: 'Data is not deleted',
                                icon: 'error',
                                confirmButtonText: 'OK'
                        })
                        }
                })

            }    
        },
        mounted(){
                this.getData()
        },
}
</script>