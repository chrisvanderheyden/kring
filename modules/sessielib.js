var pg = require('pg');
var defaultconnectionString = "postgres://cdmnpexlgydtkn:bNLnLAPuh8mjqj5U49eQd4L2Vb@ec2-54-243-47-83.compute-1.amazonaws.com:5432/d2ct08qhb0e2tv?ssl=true"


function SessieLib(options){
    if(options!==undefined){
        if(options.cs !== undefined){
            this.cs = options.cs
        }
        else{
            this.cs = defaultconnectionString;
        }
    }
    else{
            this.cs = defaultconnectionString;
    }
}

SessieLib.prototype.getSessies = function(req,res){
  // Get a Postgres client from the connection pool
    pg.connect(this.cs, function(err, client, done) {
              var results = new Array();
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM public.fotosessie ORDER BY id ASC;");
  
        // Stream results back one row at a time
        query.on('row', function(row) {
            row.ts = row.datum + row.start;
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });

    });

}
exports = SessieLib;
module.exports = new SessieLib();