<template>
        <div>
              <div class="container-fluid px-4">
                <h1 class="mt-4">Student</h1>
                <ol class="breadcrumb mb-4">
                      <li class="breadcrumb-item"><router-link to="/home">Home</router-link></li>
                        <li class="breadcrumb-item active">Student</li>
                </ol>
                
                <div class="card mb-4">
                <div class="card-header">
                        <i class="fas fa-table me-1"></i>
                        List Student

                        <button @click="Add()" data-bs-toggle="modal" data-bs-target="#student_modal" class="btn btn-primary btn-sm float-end"><i class="fas fa-plus fa-fw" data-bs-dismiss="modal"></i>Add Student</button>
                        
                </div>
                <div class="card-body">
                        <table id="student_table" class="table table-responsive table-striped table-hover">
                        <thead>
                                <tr>
                                <th>STUDENT ID</th>
                                <th>STUDENT NAME</th>
                                <th>DATE BIRTH</th>
                                <th>GENDER</th>
                                <th>ADDRESS</th>
                                <th>CLASS</th>
                                <th>ACTION</th>
                                </tr>
                        </thead>
                        <tbody>
                             <tr v-for="la in student_list" :key="la"> 
                                <td>{{la.student_id}}</td>
                                <td>{{la.student_name}}</td>
                                <td>{{la.date_of_birth}}</td>
                               <td>
                                    <span class="badge bg-info" v-if="la.gender === 'L'">Laki-Laki</span>
                                    <span class="badge bg-warning" v-if="la.gender === 'P'">Perempuan</span>
                                </td>
                                <td>{{la.address}}</td>
                               <td><span class="badge bg-dark" >{{ la.class_name + ' '}}</span></td>
                                <td>
                                        <button class="btn btn-success" @click="Edit(la)" data-bs-toggle="modal" data-bs-target="#student_modal"><i class="fas fa-pencil-alt fa-fw"></i></button>
                                         <button class="btn btn-danger" @click="Delete(la.student_id)"><i class="fas fa-trash-alt fa-fw"></i></button>
                                </td>  
                             </tr> 
                        </tbody>
                        </table>
                </div>
                </div>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="student_modal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog modal-md bg-priamry">
                        <div class="modal-content">
                        <div class="modal-header">
                                <h5 class="modal-title" id="staticBackdropLabel">Student Data</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                              <div class="mb-3">
                                 <label for="student_name" class="form-label">Student Name</label>
                                 <input type="text" class="form-control" id="student_name" v-model="student_name" placeholder="Student Name">
                              </div> 

                              <div class="mb-3">
                                 <label for="date_of_birth" class="form-label">Date Birth</label>
                                 <input type="date" class="form-control" id="date_of_birth" v-model="date_of_birth" placeholder="Date Birth">
                              </div> 

                             <div class="mb-3">
                            <label for="gender" class="form-label">Gender</label>
                            <select class="form-control" v-model="gender">
                                <option value="" disabled>-- Choose Gender --</option>
                                <option value="L">Laki-Laki</option>
                                <option value="P">Perempuan</option>
                            </select>
                        </div>

                         <div class="mb-3">
                              <label for="address" class="form-label">Address</label>
                              <textarea class="form-control" id="address" v-model="address" rows="3"></textarea>
                        </div>

                        <div class="mb-3">
                            <label for="class" class="form-label">Class</label>
                            <select class="form-control" v-model="class_id">
                                <option value="" disabled>-- Choose Class --</option>
                                <option v-for="b in list_class" :key="b" v-bind:value="b.class_id">{{ b.class_name }} - {{ b.group }}</option>
                            </select>
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
                        student_id: "",
                        student_name: "",
                        date_of_birth: "",
                        gender: "",
                        address: "",
                        action: "",
                        class_id: "",
                        student_list: [],
                        list_class: []
                }
        },
        methods: {
                getData: function(){
                        //token
               let config = {
                    headers: { "Authorization": "Bearer " + this.$cookies.get("Authorization")}
                }
                axios.get(api_url + "/Students", config)
                .then( response => {
                  this.student_list = response.data;   
                })

                },
                getClass: function(){
                        //token
               let config = {
                    headers: { "Authorization": "Bearer " + this.$cookies.get("Authorization")}
                }
                axios.get(api_url + "/Grade", config)
                .then( response => {
                  this.list_class = response.data;   
                })

                },
                Add: function(){
                    this.student_id = ""
                    this.student_name = ""
                    this.date_of_birth = ""
                    this.gender = ""
                    this. address = ""
                    this.class_id = ""
                    this.action = "insert"

                    this.getClass()
                
                },
                Edit: function(la){
                      this.student_id = la.student_id
                      this.student_name = la.student_name
                      this.date_of_birth = la.date_of_birth
                      this.gender= la.gender
                      this.address = la.address
                      this.class_id = la.class_id
                      this.action = la.action = "update" 

                      this.getClass()

                },
                
                Save: function(){
                //maping token
                let config = {
                    headers: { "Authorization": "Bearer " + this.$cookies.get("Authorization")}
                }

                //maping data 
                let form = {
                        //harus sama dengan backend
                        'student_name': this.student_name,
                        'date_of_birth': this.date_of_birth,
                        'gender': this.gender,
                        'address': this.address,
                        'class_id': this.class_id,

                }

                if(this.action === 'insert'){ //POST

                        axios.post(api_url + '/Students', form, config)
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

                        axios.put(api_url + '/Students/' + this.student_id, form, config)
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
                Delete: function(student_id){
                //maping token 
                    let config = {
                    headers: { "Authorization": "Bearer " + this.$cookies.get("Authorization")}
                }

                        Swal.fire({
                                title: 'Delete Data Student',
                                text: 'Do you want to delete this data?',
                                icon: 'warning',
                                showDenyButton: true,
                                showCancelButton: false,
                                confirmButtonText: 'Yes',
                                denyButtonText: `No`,
                                }).then((result) => {
                        if (result.isConfirmed) {
                                axios.delete(api_url + '/Students/' + student_id, config)
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