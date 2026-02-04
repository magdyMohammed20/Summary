1- Handle GET And POST Requests
----------------------------------

    app.py
    --------

    from flask import Flask , render_template , request
    from flask_scss import Scss
    from flask_sqlalchemy import SQLAlchemy
    from datetime import datetime

    app = Flask(__name__)
    Scss(app)


    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
    db = SQLAlchemy(app)


    class myTask(db.Model):
        id = db.Column(db.Integer , primary_key = True)
        content = db.Column(db.String(100) , nullable=False)
        complete = db.Column(db.Integer , default=0)
        created = db.Column(db.DateTime , default=datetime.now)

        def __repr__(self) -> str:
            return f"Task {self.id}"


    # Handle Send Data To Html And Handle GET And POST
    @app.route("/" , methods=["POST" , "GET"])
    def index():
        
        if request.method == "POST":
            current_task = request.form["content"]
            new_task = myTask(content=current_task)
            try:
                db.session.add(new_task)
                db.session.commit()
            except Exception as e:
                print(f"Error : {e}")
                return f"Error : {e}"
        else:
            tasks = myTask.query.order_by(myTask.created).all()
            return render_template("index.html" , tasks=tasks)


    if __name__ in "__main__":
        app.run(debug=True)

        ########### Create DB ##############
        with app.app_context():
            db.create_all()

        app.run(debug=True)