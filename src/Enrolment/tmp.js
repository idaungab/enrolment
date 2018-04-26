router.post('/checkOfferedtoStudent', function(request, response) {
	var studid = request.body.studid;
	var sy = request.body.sy;
	var sem = request.body.sem;
	var block = request.body.block;
	var progcode = request.body.progcode;
	var year = request.body.year;
	var subjcode = "";

	pool.connect((err,db,done)=>{
		if(err){
			console.log(err);
		}
		else {
			var Query = "SELECT distinct REGISTRATION.StudID, REGISTRATION.subjcode, REGISTRATION.section, REGISTRATION.SY, REGISTRATION.Sem, Schedule.days, Schedule.fromtime, Schedule.totime, "+
                  " SUBJECT.courseno,Schedule.fromtime,(to_char(to_timestamp(schedule.fromtime::text,'HH24:MI'),'HH12:MI AM')||'-'||to_char(to_timestamp(schedule.totime::text,'HH24:MI'),'HH12:MI AM'))::varchar as skedtime "+
                  " ,subject.description::varchar as description, subject.lab, subject.lec, subject.unit, OfferedSubject.is_requested, REGISTRATION.datevalidated "+
                  " FROM SUBJECT INNER JOIN ((OfferedSubject INNER JOIN Schedule ON (OfferedSubject.Sem = Schedule.Sem) AND (OfferedSubject.SY = Schedule.SY) AND (OfferedSubject.section = Schedule.section) AND (OfferedSubject.subjcode = Schedule.subjcode)) "+
                  " INNER JOIN REGISTRATION ON (OfferedSubject.Sem = REGISTRATION.Sem) AND (OfferedSubject.SY = REGISTRATION.SY) AND (OfferedSubject.section = REGISTRATION.section) AND (OfferedSubject.subjcode = REGISTRATION.subjcode)) ON SUBJECT.subjcode = OfferedSubject.subjcode "+
                  " WHERE REGISTRATION.StudID=$1 AND REGISTRATION.SY=$2 AND REGISTRATION.Sem=$3 ORDER BY courseno";
			db.query(Query,[studid,sy,sem],(err,table) =>{
				if(err){
					console.log(err);
				}
				else {
						if(table.rows.length === 0 && block === ''){
								var Query1 = "SELECT distinct $1,subjcode,section,$2,$3 FROM offeredfor "+
											" WHERE sy=$2 and sem=$3 and  $5 ilike progcode||'%' and block=$4 and studlevel=$6";
								db.query(Query,[studid,sy,sem,block,progcode,year],(err,table) =>{
									if(err){
										console.log(err);
									}
									else {
											if(table.rows.length > 0){
													var Query1 = "INSERT INTO registration(studid,subjcode,section,sy,sem) "+
																" SELECT distinct $1,o.subjcode,section,$2,$3 FROM offeredfor o, "+
																" (SELECT subjcode FROM offeredfor WHERE sy=$2 and sem=$3 and $5 ilike progcode " +
																" and block=$4 and studlevel=$6 EXCEPT "+
																" SELECT subjcode FROM registration WHERE studid=$1 and (is_pass(grade) OR (grade='INC' and is_pass(gcompl)))) as p "+
																" WHERE o.subjcode=p.subjcode and sy=$2 and sem=$3 and $5 ilike progcode and block=$4 and studlevel=$6";
													db.query(Query,[studid,sy,sem,block,progcode,year],(err,table) =>{
														if(err){
															console.log(err);
														}
														else {
																console.log("data inserted");
																var Query2 = "SELECT distinct $1,subjcode,section,$2,$3 FROM offeredfor "+
																					" WHERE sy=$2 and sem=$3 and  $5 ilike progcode||'%' and block=$4 and studlevel=$6 LIMIT 1";
																db.query(Query,[studid,sy,sem,block,progcode,year],(err,table) =>{
																	if(err){
																		console.log(err);
																	}
																	else {
																		subjcode = table.rows[0].subjcode;
																		var Query3 = "SELECT DISTINCT * FROM "+
                                                " (SELECT DISTINCT SUBJECT.courseno, OfferedSubject.subjcode, OfferedSubject.section, OfferedSubject.SY, OfferedSubject.Sem, "+
                                                " (to_char(to_timestamp(Schedule.fromtime::text, 'HH24:MI:SS'::text), 'HH12:MI AM')|| '-' ||to_char(to_timestamp(Schedule.totime::text, 'HH24:MI:SS'::text), 'HH12:MI AM'))::varchar as skedtime, "+
                                                " Schedule.days,OfferedSubject.Slots as quota,(OfferedSubject.Slots-OfferedSubject.Enrollees)::int2 as slots,subject.unit, "+
                                                " OfferedSubject.is_restricted,(CASE WHEN OfferedSubject.is_reQUESTED THEN 'REQ' ELSE 'REG' END)::VARCHAR AS OFFERING, "+
                                                " subject.description::varchar as description, subject.lab, subject.lec, subject.unit "+
                                                " FROM subject,offeredsubject,schedule,offeredFor "+
                                                " WHERE subject.subjcode=offeredsubject.subjcode and offeredsubject.subjcode=schedule.subjcode and offeredsubject.section=schedule.section and offeredsubject.sy=schedule.sy and offeredsubject.sem=schedule.sem "+
                                                " AND  offeredsubject.subjcode=offeredFor.subjcode and offeredsubject.section=offeredFor.section and offeredsubject.sy=offeredFor.sy and offeredsubject.sem=offeredFor.sem "+
                                                " AND  (OfferedSubject.Slots-OfferedSubject.Enrollees)>0 "+
                                                " AND  OfferedSubject.SY=$2 AND OfferedSubject.Sem=$3 AND OfferedSubject.subjcode=$7 "+
                                                " AND (OfferedSubject.is_restricted=false OR (OfferedSubject.is_restricted AND offeredFor.progcode=$5 )) "+
                                                " UNION "+
                                                " SELECT DISTINCT SUBJECT.courseno, OfferedSubject.subjcode, OfferedSubject.section, OfferedSubject.SY, OfferedSubject.Sem, "+
                                                " (to_char(to_timestamp(Schedule.fromtime::text, 'HH24:MI:SS'::text), 'HH12:MI AM')|| '-' ||to_char(to_timestamp(Schedule.totime::text, 'HH24:MI:SS'::text), 'HH12:MI AM'))::varchar as skedtime, "+
                                                " Schedule.days,OfferedSubject.Slots as quota,(OfferedSubject.Slots-OfferedSubject.Enrollees)::int2 as slots,subject.unit, "+
                                                " OfferedSubject.is_restricted,(CASE WHEN OfferedSubject.is_reQUESTED THEN 'REQ' ELSE 'REG' END)::VARCHAR AS OFFERING, "+
                                                " subject.description::varchar as description, subject.lab, subject.lec, subject.unit "+
                                                " FROM subject,offeredsubject,schedule "+
                                                " WHERE subject.subjcode=offeredsubject.subjcode and offeredsubject.subjcode=schedule.subjcode and offeredsubject.section=schedule.section and offeredsubject.sy=schedule.sy and offeredsubject.sem=schedule.sem "+
                                                " AND  (OfferedSubject.Slots-OfferedSubject.Enrollees)>0 "+
                                                " AND  OfferedSubject.SY=$2 AND OfferedSubject.Sem=$3 AND OfferedSubject.subjcode=$7 "+
                                                " AND OfferedSubject.is_restricted=false) as qry ";
																		db.query(Query,[studid,sy,sem,block,progcode,year,subjcode],(err,table) =>{
																			if(err){
																				console.log(err);
																			}
																			else {
                                          db.end();
                                          response.send(table.rows);
																			}
																		})
																	}
																})
														}
													})
											}else{
												db.end();
												response.send({message: "No assigned course offering for the given BLOCK.", offering:"false"});
											}
									}
								})
						}
				}
			})
		}
	})
 });

 router.post('/getBlocks',function(request,response){
	var progcode = request.body.progcode;
	var sy = request.body.sy;
	var sem = request.body.sem;

	pool.connect((err,db,done) =>{
		if(err){
			console.log(err);
		}
		else{
			var Query = "Select distinct block  from offeredfor where progcode=$1 and sy=$2 and sem=$3 order by block desc";

			db.query(Query,[progcode,sy,sem],(err,table) =>{
				if(err){
					console.log(err);
				}else{
					db.end();
					response.send(table.rows);
				}
			})
		}
	})
});






 
 
 
