router.post('/newProgram',function(request,response){
  var progcode = request.body.progcode;
  var progdesc = request.body.progdesc;
  var isActive = request.body.isActive;
  var undergrad = request.body.undergrad;
  var masteral = request.body.masteral;
  var phd = request.body.phd;
  var progdept = request.body.progdept;
  var major = request.body.major;
  var college = request.body.college;
  var shorthand = request.body.shorthand;

  let values = [progcode, progdesc, isActive, undergrad, masteral, phd, progdept, major, college, shorthand];

  pool.connect((err,db,done) =>{
    done();
    if(err){
      return response.status(400).send(err);
    }else{
      db.query('INSERT into program (progcode,progdesc,is_active,undergrad,progdept,major,masteral,phd,college,shorthand)values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,)',
      [...values], (err,table) => {
        if(err){
          return response.status(400).send(err);
        }else{
          console.log('Program inserted');
          response.status(201).send({message:'Data inserted'});
        }
      })
    }
  })
});
router.post('/newCollege',function(request,response){
  var colcode = request.body.colcode;
  var college = request.body.college;
  var empid = "M01 - 002";

  let values = [colcode,college,empid];

  pool.connect((err,db,done) =>{
    done();
    if(err){
      return response.status(400).send(err);
    }else{
      db.query('INSERT into college (colcode,college,empid)values($1,$2,$3)',
      [...values], (err,table) => {
        if(err){
          return response.status(400).send(err);
        }else{
          console.log('College inserted');
          response.status(201).send({message:'Data inserted'});
        }
      })
    }
  })
});
