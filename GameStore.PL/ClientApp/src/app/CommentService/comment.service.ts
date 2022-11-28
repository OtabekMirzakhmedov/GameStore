import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';

@Injectable()
export class CommentService {
    CurrentUser?: UserModel = JSON.parse(localStorage.getItem('user'));

    constructor(private httpClient: HttpClient, @Inject('BASE_URL') private baseUrl: string
    ) { }

    getComments(gameid:number): Observable<CommentModel[]> {
        return this.httpClient.get<CommentModel[]>(
            this.baseUrl + 'api/Comment/games/' + gameid
        );
    }

    createComment(text: string,
        parentId: number| 0 = 0, gameid:number): Observable<CommentModel> {


        return this.httpClient.post<CommentModel>(this.baseUrl + 'api/Comment/', {
           
            text: text,
            parentCommentId: parentId,
            createdTime: new Date(),
            userId: this.CurrentUser.id,
            gameId: gameid,
            userImageUrl: this.CurrentUser.imageUrl,
            userFirstName: this.CurrentUser.firstName,
            userLastName: this.CurrentUser.lastName
        });
    }




    //updateComment(id: string, text: string): Observable<CommentInterface> {
    //    return this.httpClient.patch<CommentInterface>(
    //        `http://localhost:3000/comments/${id}`,
    //        {
    //            body: text,
    //        }
    //    );
    //}

    //deleteComment(id: string): Observable<{}> {
    //    return this.httpClient.delete(`http://localhost:3000/comments/${id}`);
    //}
}

interface CommentModel {
    id: number;
    text: string,
    parentCommentId: number;
    createdTime: Date,
    userId: number,
    gameId: number,
    userImageUrl: string,
    userFirstName: string,
    userLastName: string
}

interface UserModel {
    id: number,
    firstName: string,
    lastName: string,
    userName: string,
    email: string,
    password: string,
    imageUrl: string
}
