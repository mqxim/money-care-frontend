import { CategoryRepository } from '../../domain/repository/category.repository';
import { CategoryDto } from '../dto/category.dto';
import { Injectable } from '@angular/core';

export interface FindCategoriesResponse {
  categories: CategoryDto[];
}

@Injectable()
export class FindCategoriesUseCase {
  constructor(
    public repository: CategoryRepository,
  ) {
  }

  public exec(): Promise<FindCategoriesResponse> {
    return this.repository.findAll()
      .then((cs) => cs.map((c) => ({
        id: c.getId(),
        name: c.getName(),
        color: c.getColor(),
      })))
      .then((cs) => ({
        categories: cs
      }));
  }
}
