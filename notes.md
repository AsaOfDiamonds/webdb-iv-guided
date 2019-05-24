using this data model 
https://docs.google.com/spreadsheets/d/1K5hBGAG5u5YvEilP1uNcz5n6edSYjXi5ykiSbKqT_7I/edit#gid=0

if you need a many to many make a middle table to connect the 2 many to many tables



select s.name as student, c.name as cohort
from students as s
inner join cohorts as c on s.cohortID = c.id

//list of all students including track
select s.name as student, t.name as track
from students as s
inner join cohorts as c on s.cohortid = c.id
inner join tracks as t on t.id = c.trackid